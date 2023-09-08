/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { ResourceElementConfig } from "../../../../OcdPropertyTypes"
import { OciCommonConfigs } from "../../OciCommonConfigs"

export namespace OciSubnetConfigs {
    export function configs(): ResourceElementConfig[] {
        return [
            ...OciCommonConfigs.configs().filter(c => c.id !== 'availability_domain'), // Override 'availability_domain'
            {
                id: 'availability_domain',
                properties: {},
                configs: [],
                options: [
                    {id: '', displayName: 'Regional'},
                    {id: '1', displayName: 'Availability Domain 1'},
                    {id: '2', displayName: 'Availability Domain 2'},
                    {id: '3', displayName: 'Availability Domain 3'}
                ]
            }
        ]
    }
}
