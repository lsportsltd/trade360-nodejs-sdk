import { plainToInstance } from 'class-transformer';
import { GetLivescoreResultElement } from '../../../../../src/api/common/snapshot/responses/livescore-response';
import { GetEventsResultElement } from '../../../../../src/api/common/snapshot/responses/events-response';

describe('snapshot livescore stoppage time', () => {
  const withStoppage = {
    FixtureId: 10,
    Livescore: {
      Scoreboard: {
        Clock: {
          Seconds: 5400,
          StoppageTimeSeconds: 300,
        },
      },
    },
  };

  it('keeps StoppageTimeSeconds on GetLivescore and GetEvents', (): void => {
    const livescore = plainToInstance(GetLivescoreResultElement, withStoppage, {
      excludeExtraneousValues: true,
    });
    const events = plainToInstance(GetEventsResultElement, withStoppage, {
      excludeExtraneousValues: true,
    });

    expect(livescore.livescore?.scoreboard?.clock?.stoppageTimeSeconds).toBe(300);
    expect(livescore.livescore?.scoreboard?.clock?.seconds).toBe(5400);
    expect(events.livescore?.scoreboard?.clock?.stoppageTimeSeconds).toBe(300);
  });

  it('leaves StoppageTimeSeconds unset when the snapshot omits it', (): void => {
    const cleared = {
      FixtureId: 10,
      Livescore: {
        Scoreboard: {
          Clock: { Seconds: 5400 },
        },
      },
    };
    const livescore = plainToInstance(GetLivescoreResultElement, cleared, {
      excludeExtraneousValues: true,
    });

    expect(livescore.livescore?.scoreboard?.clock?.stoppageTimeSeconds).toBeUndefined();
  });
});
