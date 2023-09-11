/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

export interface OcdSchemaEntry extends Record<string, any> {}

export interface OcdSchema extends Record<string, OcdSchemaEntry> {}
