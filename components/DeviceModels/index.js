import React, { Component } from 'react'
// import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import Link from '../Link'
import { ModelButton } from '../Button'

export default class DeviceModels extends Component {
  render() {
    const { models } = this.props
    return (
      <Row center="xs">
        <Col xs={12}>
          {
            models && models.map(model => <ModelButton><Link>{model.name}</Link></ModelButton>)
          }
        </Col>
      </Row>
    )
  }
}