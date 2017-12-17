import React, { Component } from 'react'
import { Col } from 'react-styled-flexboxgrid'
import Link from '../Link'
import { StandardRow } from '../CommonStyled'
import { ModelButton } from '../Button'

export default class DeviceModels extends Component {
  render() {
    const { models } = this.props
    return (
      <StandardRow center="xs">
        <Col xs={12}>
          {
            models && models.map(model =>
              <Link key={model.name} href={`/model?model=${model.meta_route}`} as={`/model/${model.meta_route}`}>
                <ModelButton>
                  {model.name}
                </ModelButton>
              </Link>
            )
          }
        </Col>
      </StandardRow>
    )
  }
}