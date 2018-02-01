/* To create a service we put .service.ts to the name of the service we want to create.
In this case we named the file: logging.service.ts.
The best naming convention for this logging service would be simply: LoggingService as
shown below.
We think we need some sort of decorator like @Decorator to create a service but we don't.
A service in Angular is just a normal Typescript class as shown below.
 */
export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }
}
