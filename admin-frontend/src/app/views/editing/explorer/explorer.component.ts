import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FileDetailDto } from './fileDetailDto';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {ExplorerService} from './explorer.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'farztev-explorer',
  templateUrl: 'explorer.component.html',
  styleUrls: ['explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  private environment = environment;

  constructor(public explorerService: ExplorerService) {
  }

  files: FileDetailDto[];
  currentPath: string;
  previousPaths: string[];
  @ViewChild('f') form: NgForm;

  @Output() public selectedFiles = new EventEmitter();

  // private listOfSelectedFiles : FileDetailDto[] = [];

  ngOnInit() {
    this.currentPath = "/";
    this.previousPaths = [];
    this.go("/");
  }

  getFiles(folderPath : string): Observable<FileDetailDto[]> {
    return this.explorerService.getFiles(folderPath);
  }

  onSubmit() {
    console.log(this.form);
  }

  openDirectory(folderPath): void {
    this.previousPaths.push(this.currentPath);
    this.go(folderPath);
  }

  go(folderPath): void {
    this.getFiles(folderPath).subscribe(files => {
      this.files = files;
      this.currentPath = folderPath;
    });
  }

  goBack(): void {
    console.log(this.previousPaths);
    this.go(this.previousPaths.pop());
  }

  selectImage(file):void {
    /*if(this.isSelected(file)) {
      alert("Image already added!");
      return;
    }*/
    //this.listOfSelectedFiles.push(file);
    this.selectedFiles.emit(file.path);
  }

  unselectImage(file):void {
    // Remove item by filtering
    /*this.listOfSelectedFiles = this.listOfSelectedFiles.filter(function(f){
      return file.path != f.path;
    });*/
  }

  directories() : FileDetailDto[] {
    return this.files.filter(f => f.directory);
  }

  photos() : FileDetailDto[] {
    return this.files.filter(f => !f.directory);
  }

  /*isSelected(file) : boolean {
    return this.listOfSelectedFiles.filter(function (f) {return f.path == file.path}).length == 1;
  }*/

  /*send() : void {
    this.selectedFiles.emit(this.listOfSelectedFiles);
  }*/

}
