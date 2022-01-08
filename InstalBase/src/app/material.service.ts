import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMaterials(): Observable<Material[]>{
    return this.http.get<Material[]>(`${this.apiServerUrl}/material/all`);
  }

  public addMaterial(material: Material): Observable<Material>{
    return this.http.post<Material>(`${this.apiServerUrl}/material/add`, material);
  }

  public updateMaterial(material: Material): Observable<Material>{
    return this.http.put<Material>(`${this.apiServerUrl}/material/update`, material);
  }

  public deleteMaterial(materialId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/material/delete/${materialId}`);
  }
}
