/**
 * StartMessage enum is responsible for defining the
 * messages that are returned when a distribution is
 * started.
 */
export enum StartMessage {
  activated = 'Distribution is: Active',
  alreadyActive = 'Distribution is already Active',
}

/**
 * StopMessage enum is responsible for defining the
 * messages that are returned when a distribution is
 * stopped.
 */
export enum StopMessage {
  inactivated = 'Distribution is: Inactive',
  alreadyInactive = 'Distribution is already Inactive',
}
