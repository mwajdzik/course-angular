import {Injectable} from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class AccountsService {

  accounts: string[];

  constructor(private loggingService: LoggingService) {
    this.accounts = ['admin', 'test'];
  }

  addNewAccount(account: string) {
    this.loggingService.info('Adding: ' + account);
    this.accounts.push(account);
  }
}
