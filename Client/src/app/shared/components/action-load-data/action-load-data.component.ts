import { Component, input, Input } from '@angular/core';
import { TLoadDataMode } from '../../../core/types/general.type';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { fadeInOutAnimation } from '../../animations/animations';

@Component({
  selector: 'app-action-load-data',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './action-load-data.component.html',
  styleUrl: './action-load-data.component.scss',
  animations: [fadeInOutAnimation]
})

// Responsible for action load data
export class ActionLoadDataComponent {
  @Input() loadDataMode: TLoadDataMode = 'loading';
  @Input() loadDataMsg: string = 'Data is loading, please wait...'
  loadDataTitle: string = '';
  loadDataIco: string = '';
  loadDataImg: string = '';

  ngOnInit() {

    // Determine the information according to the status state
    switch (this.loadDataMode) {
      case 'loading':
        this.loadDataTitle = 'Loading data';
        this.loadDataMsg = this.loadDataMsg;
        this.loadDataIco = 'hourglass_full';
        this.loadDataImg = 'assets/images/loadData/loading.gif';
        break;
      case 'error':
        this.loadDataTitle = 'Error receiving data';
        this.loadDataMsg = this.loadDataMsg;
        this.loadDataIco = 'error';
        this.loadDataImg = 'assets/images/loadData/error.gif';
        break;
      case 'notFound':
        this.loadDataTitle = 'No data found';
        this.loadDataMsg = this.loadDataMsg;
        this.loadDataIco = 'search_off';
        this.loadDataImg = 'assets/images/loadData/notFound.gif';
        break;
    }
  }

}
