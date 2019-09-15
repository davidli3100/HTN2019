import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask
from pydialogflow_fulfillment import DialogflowResponse, DialogflowRequest
from pydialogflow_fulfillment.response import OutputContexts, SystemIntent
from google.api_core.datetime_helpers import DatetimeWithNanoseconds

import datetime

app = Flask(__name__)

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    "projectId": "pintox-app",
})

# Use a service account
# cred = credentials.Certificate("pintox-app-76b32b360f0c.json")
# firebase_admin.initialize_app(cred)

db = firestore.client()
appointments_ref = db.collection("appointments")
temp_ref = db.collection("temp")
patients_ref = db.collection("patients")
settings_ref = db.collection("settings")


def check_time_validity(start_time: DatetimeWithNanoseconds, end_time: DatetimeWithNanoseconds):
    settings_dict = settings_ref.document("times").get().to_dict()
    appointment_start_time, appointment_end_time = settings_dict["openTime"], settings_dict["endTime"]
    if start_time.minute == 0:
        start_minute = "00"
    else:
        start_minute = str(start_time.minute)
    if end_time.minute == 0:
        end_minute = "00"
    else:
        end_minute = str(end_time.minute)
    str_start_time = str(start_time.hour) + start_minute
    str_end_time = str(end_time.hour) + end_minute
    if not (appointment_start_time <= str_start_time < str_end_time <= appointment_end_time):
        return False, "invalid time"
    docs = appointments_ref.where("startTime", ">",
                                  DatetimeWithNanoseconds(start_time.year, start_time.month, start_time.day,
                                                          tzinfo=datetime.timezone.utc)).where(
        "startTime", "<",
        DatetimeWithNanoseconds(start_time.year, start_time.month, start_time.day + 1,
                                tzinfo=datetime.timezone.utc)).get()
    if docs is not None:
        for each_doc in docs:
            each_patient_info = each_doc.to_dict()
            each_patient_start_time = each_patient_info["startTime"]
            each_patient_end_time = each_patient_info["endTime"]
            if each_patient_start_time < start_time < each_patient_end_time or \
                    each_patient_start_time < end_time < each_patient_end_time:
                return False, "unavailable time slot"
            if each_patient_start_time > start_time and each_patient_end_time < end_time:
                return False, "unavailable time slot"
            if each_patient_start_time == start_time and each_patient_end_time == end_time:
                return False, "unavailable time slot"
    return True, ""


def check_date_validity(date: DatetimeWithNanoseconds):
    settings_dict = settings_ref.document("times").get().to_dict()
    appointment_start_time, appointment_end_time = settings_dict["openTime"], settings_dict["endTime"]
    time_slots = (int(appointment_end_time[:2]) - int(appointment_start_time[:2])) * 2
    docs = appointments_ref.where("startTime", ">", DatetimeWithNanoseconds(date.year, date.month, date.day,
                                                                            tzinfo=datetime.timezone.utc)).where(
        "startTime", "<",
        DatetimeWithNanoseconds(date.year, date.month, date.day + 1, tzinfo=datetime.timezone.utc)).get()
    if docs is not None:
        if sum(1 for _ in docs) < time_slots:
            return True
        else:
            return False
    return True


def add_patient_name(name):
    pass


def add_patient_phone_number(phone_number):
    pass


def add_patient_symptoms(symptoms):
    pass


def web_hooks(request):
    dialogflow_request = DialogflowRequest(request.data)
    session_id = dialogflow_request.get_session().split("/")[-1]

    if dialogflow_request.get_intent_displayName() == "Create Appointment - User":
        _raw_user_name = dialogflow_request.get_paramter("person")
        # if isinstance(_raw_user_name, dict):
        #     user_name = _raw_user_name["name"]
        # else:
        #     if len(_raw_user_name) == 1:
        #         if isinstance(_raw_user_name[0], str):
        #             user_name = _raw_user_name[0]
        #     else:
        #         user_name = ""
        #         i = len(_raw_user_name)
        #         for e in _raw_user_name:
        #             user_name += e["name"]
        #             if i > 1:
        #                 user_name += " "
        #                 i -= 1

        str_raw_user_name = str(_raw_user_name)
        str_user_name = str_raw_user_name.strip("{").strip("}").strip("[").strip("]").strip(":").strip("'")
        temp_ref.document(session_id).set({
            "Patient": str_user_name
        })
        dialogflow_response = DialogflowResponse("Hi {}! Did I get your name right?".format(str_user_name))

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Phone":
        phone_number = dialogflow_request.get_paramter("phone-number")
        temp_ref.document(session_id).update({
            "phone_number": phone_number
        })
        dialogflow_response = DialogflowResponse("Your phone number is {}. Is that correct?".format(phone_number))

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Purpose":
        purpose = dialogflow_request.get_paramter("purpose")
        temp_ref.document(session_id).update({
            "Symptoms": purpose
        })
        dialogflow_response = DialogflowResponse("Thank you. What date would you like to make this appointment on?")

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Date":
        intend_date = dialogflow_request.get_paramter("date")
        if isinstance(intend_date, str):
            intend_date = datetime.datetime.fromisoformat(intend_date)
            intend_date = DatetimeWithNanoseconds(intend_date.year, intend_date.month, intend_date.day,
                                                  intend_date.hour, intend_date.minute)
        temp_ref.document(session_id).update({
            "intend_date": intend_date
        })
        dialogflow_response = DialogflowResponse("Ok, so the date is {}. Is that right?".format(intend_date))

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Date - yes":
        docu_dict = temp_ref.document(session_id).get().to_dict()
        intend_date = docu_dict["intend_date"]
        if isinstance(intend_date, str):
            intend_date = datetime.datetime.fromisoformat(intend_date)
            intend_date = DatetimeWithNanoseconds(intend_date.year, intend_date.month, intend_date.day,
                                                  intend_date.hour, intend_date.minute)
        if check_date_validity(intend_date):
            dialogflow_response = DialogflowResponse(
                "The date you specified is available. Please indicate a time interval (30 minutes) to book.")
            dialogflow_response.expect_user_response = False
            dialogflow_response.add(
                OutputContexts("pintox-app", session_id, "Create Appointment - Time", 200, {}))
            dialogflow_response.add(SystemIntent("Create Appointment - Time"))

        else:
            dialogflow_response = DialogflowResponse(
                "Sorry, the date you selected is full. Please select another date.")
            dialogflow_response.expect_user_response = False
            dialogflow_response.add(
                OutputContexts("pintox-app", session_id, "Create Appointment - Date", 200,
                               {}))
            dialogflow_response.add(SystemIntent("Create Appointment - Date"))

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Time":
        time_period = dialogflow_request.get_paramter("time-period")
        start_time, end_time = time_period["startTime"], time_period["endTime"]
        if isinstance(start_time, str):
            start_time = datetime.datetime.fromisoformat(start_time)
            start_time = DatetimeWithNanoseconds(start_time.year, start_time.month, start_time.day,
                                                 start_time.hour, start_time.minute)
        if isinstance(end_time, str):
            end_time = datetime.datetime.fromisoformat(end_time)
            end_time = DatetimeWithNanoseconds(end_time.year, end_time.month, end_time.day,
                                               end_time.hour, end_time.minute)
        temp_ref.document(session_id).update({
            "startTime": start_time,
            "endTime": end_time
        })
        dialogflow_response = DialogflowResponse(
            "Your time is from {} to {}. Is that correct?".format(start_time, end_time))

    elif dialogflow_request.get_intent_displayName() == "Create Appointment - Time - yes":
        docu_dict = temp_ref.document(session_id).get().to_dict()
        start_time, end_time = docu_dict["startTime"], docu_dict["endTime"]
        if isinstance(start_time, str):
            start_time = datetime.datetime.fromisoformat(start_time)
            start_time = DatetimeWithNanoseconds(start_time.year, start_time.month, start_time.day,
                                                 start_time.hour, start_time.minute)
        if isinstance(end_time, str):
            end_time = datetime.datetime.fromisoformat(end_time)
            end_time = DatetimeWithNanoseconds(end_time.year, end_time.month, end_time.day,
                                               end_time.hour, end_time.minute)

        res, msg = check_time_validity(start_time, end_time)
        if res:
            dialogflow_response = DialogflowResponse(
                "The appointment has been booked. Would you like to book another?")
            appointments_ref.document().set(docu_dict)
            patients_ref.document(docu_dict["phone_number"]).set({
                "name": docu_dict["Patient"]
            })
        else:
            if msg == "invalid time":
                dialogflow_response = DialogflowResponse("The time you specified is out of the working hour. Please select another time.")
                dialogflow_response.expect_user_response = False
                dialogflow_response.add(SystemIntent("Create Appointment - Time - hours"))
            else:
                dialogflow_response = DialogflowResponse("Sorry, the time you selected is unavailable. Please select another time.")
                dialogflow_response.expect_user_response = False
                dialogflow_response.add(SystemIntent("Create Appointment - Time - failure"))
    else:
        dialogflow_response = DialogflowResponse("This is a text response from webhook.")

    response = app.response_class(response=dialogflow_response.get_final_response(), mimetype='application/json')
    return response


if __name__ == "__main__":
    # ref = temp_ref.document("brUcwlbNQTmXA9KS3OzLCQ").get()
    # print(ref.to_dict())
    # check_date_validity(DatetimeWithNanoseconds(2019, 1, 25, tzinfo=datetime.timezone.utc))
    check_time_validity(DatetimeWithNanoseconds(2019, 9, 16, 10, 0, tzinfo=datetime.timezone.utc),
                        DatetimeWithNanoseconds(2019, 1, 16, 10, 30, tzinfo=datetime.timezone.utc))
