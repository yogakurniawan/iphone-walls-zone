import React, { Component } from 'react'
import { Col } from 'react-styled-flexboxgrid'
import { connect } from 'react-redux'
import * as globalActions from '../../actions/global'
import Link from '../Link'
import { DeviceModelsRow } from '../CommonStyled'
import { ModelButton } from '../Button'

class DeviceModels extends Component {
  handleClick(model) {
    this.props.setModel(model)
  }

  render() {
    const { models, model } = this.props
    const currentModel = model;
    return (
      <DeviceModelsRow>
        <Col xs={12}>
          {
            models && models.map(m => (
              <Link key={m.name} href={`/model?model=${m.meta_route}`} as={`/model/${m.meta_route}`}>
                <ModelButton
                  onClick={() => this.handleClick(m.meta_route)}
                  active={m.meta_route === currentModel}
                >
                  {m.name}
                </ModelButton>
              </Link>
            ))
          }
        </Col>
      </DeviceModelsRow>
    )
  }
}

const mapStateToProps = state => ({
  model: state.global.model
})

const mapDispatchToProps = {
  setModel: globalActions.setModel
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceModels)
