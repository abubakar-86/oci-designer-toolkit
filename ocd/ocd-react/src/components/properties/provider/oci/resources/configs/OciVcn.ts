/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { ResourceElementConfig } from "../../../../OcdPropertyTypes";

export namespace OciVcnConfigs {
    export function configs(): ResourceElementConfig[] {
        return [
            {
                id: 'dns_label',
                properties: {
                    maxLength: 15,
                    pattern: '^[a-zA-Z][a-zA-Z0-9]{0,15}$',
                    title: 'Only letters and numbers, starting with a letter. 15 characters max.'
                },
                configs: []
            }
        ]
    }
}