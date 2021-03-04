import { BackendServer } from '@grafana/tsbackend';
import { FakerDiagnosticsService } from './DiagnosticsService';
import { FakerDataService } from './DataService';
import { FakerResourceService } from './ResourceService';

const app = new BackendServer();
app.addDiagnosticsService(new FakerDiagnosticsService());
app.addDataService(new FakerDataService());
app.addResourceService(new FakerResourceService());

module.exports = app;