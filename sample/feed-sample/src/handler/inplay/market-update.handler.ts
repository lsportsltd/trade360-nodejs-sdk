import { IEntityHandler, MarketUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class MarketUpdateHandler implements IEntityHandler<MarketUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<MarketUpdate>) => {
    console.log('MarketUpdate received!');
    
    // Full entity data with all nested objects visible
    console.log('==== FULL MARKET UPDATE ENTITY ====');
    console.log(JSON.stringify(entity, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value, 2));
    console.log('==== END MARKET UPDATE ENTITY ====');
    
    // Alternative: Use console.dir with unlimited depth (uncomment if JSON.stringify doesn't work)
    console.log('==== ALTERNATIVE: CONSOLE.DIR OUTPUT ====');
    console.dir(entity, { depth: null, colors: true });
    console.log('==== END CONSOLE.DIR OUTPUT ====');
    
    // Option 3: Use util.inspect for more control
    // const util = require('util');
    // console.log(util.inspect(entity, { 
    //   depth: null, 
    //   colors: true, 
    //   showHidden: false,
    //   customInspect: false 
    // }));
    
    // Option 4: Log specific parts of the entity
    // console.log('Events count:', entity.events?.length);
    // entity.events?.forEach((event, index) => {
    //   console.log(`Event ${index}:`, {
    //     fixtureId: event.fixtureId,
    //     marketsCount: event.markets?.length,
    //     markets: event.markets?.map(market => ({
    //       id: market.id,
    //       name: market.name,
    //       betsCount: market.bets?.length
    //     }))
    //   });
    // });
    
    return;
  };
}
