import { Expose, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';

/**
 * IncidentsBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to an incident.
 */
export class IncidentsBodyStructure {
  @Expose({ name: 'SportId' })
  public sportId?: number;

  @Expose({ name: 'SportName' })
  public sportName?: string;

  @Expose({ name: 'IncidentId' })
  public incidentId?: number;

  @Expose({ name: 'IncidentName' })
  public incidentName?: string;

  @Expose({ name: 'Description' })
  public description?: string;

  @Expose({ name: 'LastUpdate' })
  @Transform((field) => moment(field.value))
  public lastUpdate?: Moment;

  @Expose({ name: 'CreationDate' })
  @Transform((field) => moment(field.value))
  public creationDate?: Moment;
}
