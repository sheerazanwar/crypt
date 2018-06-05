import { Component, OnChanges, Input, SimpleChanges, ViewChild} from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component(
{
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})

export class HighchartsComponent implements OnChanges
{
  @Input() config: any;
  @ViewChild('host') host;

  constructor(private chatService: ChatService) {}

  ngOnChanges(changes: SimpleChanges)
  {
    const {config} = changes;
    this.chatService.render(this.host.nativeElement, config.currentValue)
  }
}
