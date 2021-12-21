package com.komfortcieplny.InstalBase.material;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    private  final MaterialRepository materialRepository;

    @Autowired
    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public Material addMaterial(Material material) {
        return materialRepository.save(material);
    }

    public List<Material> findAllMaterials() {
        return materialRepository.findAll();
    }

    public Material updateMaterial(Material material) {
        return materialRepository.save(material);
    }

    public void deleteMaterial(Long id) {
        materialRepository.deleteById(id);
    }

    public Material findMaterial(Long id) {
        return materialRepository.findById(id).orElseThrow(() -> new MaterialNotFoundException("Material by id: " + id + " was not found"));
    }
}