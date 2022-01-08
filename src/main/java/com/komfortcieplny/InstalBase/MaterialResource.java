package com.komfortcieplny.InstalBase;

import com.komfortcieplny.InstalBase.material.Material;
import com.komfortcieplny.InstalBase.material.MaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/material")
public class MaterialResource {
    private final MaterialService materialService;

    public MaterialResource(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Material>> getAllMaterials () {
        List<Material> materials = materialService.findAllMaterials();
        return new ResponseEntity<>(materials, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Material> getMaterialById (@PathVariable("id") Long id) {
        Material material = materialService.findMaterial(id);
        return new ResponseEntity<>(material, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Material> addMaterial (@RequestBody Material material) {
        Material newMaterial = materialService.addMaterial(material);
        return new ResponseEntity<>(newMaterial, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Material> updateMaterial (@RequestBody Material material) {
        Material updatedMaterial = materialService.updateMaterial(material);
        return new ResponseEntity<>(updatedMaterial, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMaterial(@PathVariable("id") Long id) {
        materialService.deleteMaterial(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
