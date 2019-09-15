import React, { Component } from 'react'
import { SideSheet, Pane, Heading, Paragraph, Button } from 'evergreen-ui'

export default class SettingsSideSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <SideSheet
                isShown={this.props.isShown}
                onCloseComplete={() => this.props.setState()}
                containerProps={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                  }}
            >
              <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane padding={16} borderBottom="muted" display="flex" flexDirection="row" justifyContent="space-between" alignItems="baseline">
                        <Heading size={600}>Settings</Heading>
                        <Pane>
                            <Button intent="default" appearance="default" size={30}>Save</Button>
                        </Pane>
                    </Pane>
                </Pane>
            </SideSheet>
        )
    }

}