/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import OcdDocument from '../../../../OcdDocument'
import { ResourceElementConfig, ResourceProperties } from '../../../OcdPropertyTypes'
import * as AutoGenerated from './generated/OciSecret'
import { OciSecretConfigs } from './configs/OciSecret'

export const OciSecret = ({ ocdDocument, setOcdDocument, resource }: ResourceProperties): JSX.Element => {
    const configs: ResourceElementConfig[] = OciSecretConfigs.configs()
    return (
        <AutoGenerated.OciSecret ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} />
    )
}
