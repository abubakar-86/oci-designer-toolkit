/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/AzureOracledatabaseAutonomousDatabaseRegular"

export interface AzureOracledatabaseAutonomousDatabaseRegular extends AutoGenerated.AzureOracledatabaseAutonomousDatabaseRegular {}

export namespace AzureOracledatabaseAutonomousDatabaseRegular {
    
    export function newResource(type?: string): AzureOracledatabaseAutonomousDatabaseRegular {
        const resource = {
            ...AutoGenerated.AzureOracledatabaseAutonomousDatabaseRegular.newResource('oracledatabase_autonomous_database_regular'),
        }
        return resource
    }
    export function cloneResource(resource: AzureOracledatabaseAutonomousDatabaseRegular, type?: string): AzureOracledatabaseAutonomousDatabaseRegular {
        return AutoGenerated.AzureOracledatabaseAutonomousDatabaseRegular.cloneResource(resource, 'oracledatabase_autonomous_database_regular') as AzureOracledatabaseAutonomousDatabaseRegular
    }
    export function allowedParentTypes(): string[] {
        return []
    }
    export function getParentId(resource: AzureOracledatabaseAutonomousDatabaseRegular): string {
        const parentId = resource.compartmentId
        return parentId
    }
    export function setParentId(resource: AzureOracledatabaseAutonomousDatabaseRegular, parentId: string): AzureOracledatabaseAutonomousDatabaseRegular {
        return resource
    }
    export function getConnectionIds(resource: AzureOracledatabaseAutonomousDatabaseRegular, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        let associationIds: string[] = []
        return associationIds
    }
}

export class AzureOracledatabaseAutonomousDatabaseRegularClient extends AutoGenerated.AzureOracledatabaseAutonomousDatabaseRegularClient {
    static new(): AzureOracledatabaseAutonomousDatabaseRegular {
        return AzureOracledatabaseAutonomousDatabaseRegular.newResource()
    }
    static clone(resource: AzureOracledatabaseAutonomousDatabaseRegular): AzureOracledatabaseAutonomousDatabaseRegular {
        return AzureOracledatabaseAutonomousDatabaseRegular.cloneResource(resource)
    }
}

export default AzureOracledatabaseAutonomousDatabaseRegularClient
