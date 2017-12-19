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
            models && models.map(model =>
              <Link key={model.name} href={`/model?model=${model.meta_route}`} as={`/model/${model.meta_route}`}>
                <ModelButton onClick={() => this.handleClick(model.meta_route)} active={model.meta_route === currentModel}>
                  {model.name}
                </ModelButton>
              </Link>
            )
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