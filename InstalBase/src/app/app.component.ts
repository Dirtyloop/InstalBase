import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Material } from './material';
import { MaterialService } from './material.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public materials: Material[] = [];
  public editMaterial!: Material;
  public deleteMaterial!: Material;
  public buyMaterial!: Material;

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.getMaterials();
  }

  public getMaterials(): void {
    this.materialService.getMaterials().subscribe(
      (response: Material[]) => {
        console.log(response);
        this.materials = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMaterial(addForm: NgForm): void {
    document.getElementById('add-material-form')!.click();
    if (this.validateQuantity(addForm.value) && this.validatePrice(addForm.value)) {
    this.materialService.addMaterial(addForm.value).subscribe(
      (response: Material) => {
        console.log(response);
        this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );}
    addForm.reset();
  }

  public onUpdateMaterial(material: Material): void {
    if (this.validateQuantity(material) && this.validatePrice(material)) {
    this.materialService.updateMaterial(material).subscribe(
      (response: Material) => {
        console.log(response);
        this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );} else {
      this.editMaterial = material;
      this.buyMaterial = material;
    }

  }

  public onBuyOneMaterial(material: Material): void {
    material.quantity++;
    this.materialService.updateMaterial(material).subscribe(
      (response: Material) => {
        console.log(response);
        //this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        material.quantity--;
      }
    );
  }

  public onUseOneMaterial(material: Material): void {
    if (material.quantity >= 1) {
      material.quantity--;
    } else {
      alert("You are out of " + material.name);
    }
    
    this.materialService.updateMaterial(material).subscribe(
      (response: Material) => {
        console.log(response);
        //this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        material.quantity++;
      }
    );
  }
  

  public onDeleteMaterial(materialId: number): void {
    this.materialService.deleteMaterial(materialId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMaterials(key: string): void {
    const results: Material[] = [];
    for (const material of this.materials) {
      if (material.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || material.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(material);
      }
    }
    this.materials = results;
    if (results.length === 0 || !key) {
      this.getMaterials();
    }
  }

  public validateQuantity(material: Material): boolean {
    if (material.quantity < 0) {
      alert("You cannot input negative quantity of " + material.name)
      return false;
    }
    return true;
  }

  public validatePrice(material: Material): boolean {
    if (material.price < 0) {
      alert("You cannot input negative price of " + material.name)
      return false;
    }
    return true;
  }

  public onSortUpByPrice(): void {
      this.materials.sort((a, b) => (a.price - b.price));
    
  }

  public onSortDownByPrice(): void {
      this.materials.sort((a, b) => (b.price - a.price));
  }

  public onSortUpByName(): void {
    this.materials.sort((a, b) => (a.name.localeCompare(b.name)));
}

  public onSortDownByName(): void {
    this.materials.sort((a, b) => (b.name.localeCompare(a.name)));
}

  public onOpenModal(material: Material, mode: string): void {
  
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMaterialModal');
    }
    if (mode === 'update') {
      this.editMaterial = material;
      button.setAttribute('data-target', '#updateMaterialModal');
    }
    if (mode === 'buy') {
      this.buyMaterial = material;
      button.setAttribute('data-target', '#buyMaterialModal');
    }
    if (mode === 'delete') {
      this.deleteMaterial = material;
      button.setAttribute('data-target', '#deleteMaterialModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public xlsReport(): void {
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('materialList')!;
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'material-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  public printReport(): void {
    window.print();
  }

}
