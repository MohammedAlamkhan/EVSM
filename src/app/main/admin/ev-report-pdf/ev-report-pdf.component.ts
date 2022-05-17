import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-ev-report-pdf',
  templateUrl: './ev-report-pdf.component.html',
  styleUrls: ['./ev-report-pdf.component.scss']
})
export class EvReportPdfComponent implements OnInit {
  
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
