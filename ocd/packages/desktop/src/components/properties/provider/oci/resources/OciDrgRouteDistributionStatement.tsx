/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import OcdDocument from '../../../../OcdDocument'
import { ResourceElementConfig, ResourceProperties } from '../../../OcdPropertyTypes'
import * as AutoGenerated from './generated/OciDrgRouteDistributionStatement'
import { OciDrgRouteDistributionStatementConfigs } from './configs/OciDrgRouteDistributionStatement'

export const OciDrgRouteDistributionStatement = ({ ocdDocument, setOcdDocument, resource }: ResourceProperties): JSX.Element => {
    const configs: ResourceElementConfig[] = OciDrgRouteDistributionStatementConfigs.configs()
    return (
        <AutoGenerated.OciDrgRouteDistributionStatement ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} />
    )
}
