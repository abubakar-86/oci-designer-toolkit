/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import OcdDocument from '../../../../OcdDocument'
import { ResourceElementConfig, ResourceProperties } from '../../../OcdPropertyTypes'
import * as AutoGenerated from './generated/OciInstance'
import { OciInstanceConfigs } from './configs/OciInstance'
import { CacheContext } from '../../../../../pages/OcdConsole'
import { useContext } from 'react'

export const OciInstance = ({ ocdDocument, setOcdDocument, resource }: ResourceProperties): JSX.Element => {
    const configs: ResourceElementConfig[] = OciInstanceConfigs.configs()
    // @ts-ignore
    const {ocdCache, setOcdCache} = useContext(CacheContext)
    const shape = ocdCache.getOciReferenceDataList('shapes').find((r: Record<string, any>) => r.id === resource.shape)
    // For flexible shapes add min / max values based on Cache information for Memory and OCPU
    if (shape !== undefined && shape.isFlexible) {
        const memoryInGbsProps: ResourceElementConfig = {
            id: 'shape_config.memory_in_gbs',
            properties: {
                min: shape.memoryOptions.minInGBs,
                max: shape.memoryOptions.maxInGBs
            },
            configs: []
        }
        const ocpusProps: ResourceElementConfig = {
            id: 'shape_config.ocpus',
            properties: {
                min: shape.ocpuOptions.min,
                max: shape.ocpuOptions.max
            },
            configs: []
        }
        configs.push(memoryInGbsProps)
        configs.push(ocpusProps)
    }
    return (
        <AutoGenerated.OciInstance ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} />
    )
}
