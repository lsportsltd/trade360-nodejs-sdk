import { Expose } from 'class-transformer';

/**
 * TourBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a tour.
 */
export class TourBodyStructure {
  @Expose({ name: 'TourId' })
  public tourId?: number;

  @Expose({ name: 'TourName' })
  public tourName?: string;

  @Expose({ name: 'SportId' })
  public sportId?: number;

  @Expose({ name: 'SportName' })
  public sportName?: string;
}



