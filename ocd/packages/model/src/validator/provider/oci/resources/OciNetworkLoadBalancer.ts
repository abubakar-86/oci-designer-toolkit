/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from './generated/OciNetworkLoadBalancer'
import * as Model from '../../../../provider/oci/resources'
import { OciResources } from '../../../../OcdDesign'
import { OcdResourceValidator, OcdValidationResult, OcdValidatorResource } from '../../../OcdResourceValidator'

export namespace OciNetworkLoadBalancer {
    export function validateResource(resource: Model.OciNetworkLoadBalancer, resources: OciResources): OcdValidationResult[] {
        return [...AutoGenerated.OciNetworkLoadBalancer.validateResource(resource, resources), ...customValidation(resource, resources)]
    }
    export function isResourceValid(resource: Model.OciNetworkLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => !v.valid).length > 0)
    }
    export function hasErrors(resource: Model.OciNetworkLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'error').length > 0)
    }
    export function hasWarnings(resource: Model.OciNetworkLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'warning').length > 0)
    }
    export function hasInformation(resource: Model.OciNetworkLoadBalancer, resources: OciResources): boolean {
        return (validateResource(resource, resources).filter((v: OcdValidationResult) => v.type === 'information').length > 0)
    }
    function customValidation(resource: Model.OciNetworkLoadBalancer, resources: OciResources): OcdValidationResult[] {
        const results: OcdValidationResult[] = []
        return results
    }
}
