// Other dependencies
import fs = require('fs');

// Local files
import { configService } from '../config/config.service';

fs.writeFileSync('ormconfig.json',
    JSON.stringify(configService.getTypeOrmConfig(), null, 4)
);
