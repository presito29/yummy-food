package com.example.demo.service;


import com.example.demo.model.entity.Category;
import com.example.demo.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class CategoryService{

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public Category create (String name){
        Category category = new Category();
        category.setName(name.toUpperCase());
        return categoryRepository.save(category);
    }

    public Category findCategoryById(Long id) throws Exception{
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (optionalCategory.isEmpty()){
            throw new Exception("Category not found");

        }
        return optionalCategory.get();
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
