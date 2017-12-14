import React, { Component } from 'react'
// import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import Link from '../Link'
import { ModelButton } from '../Button'

export default class DeviceModels extends Component {
  render() {
    const { models } = this.props
    return (
      <Row style={{ margin: 10 }}>
        <Col xs={12}>
          {
            models && models.map(model =>
              <Link href={`/model?model=${model.meta_route}`} as={`/model/${model.meta_route}`}>
                <ModelButton>
                  {model.name}
                </ModelButton>
              </Link>
            )
          }
        </Col>
      </Row>
    )
  }
}