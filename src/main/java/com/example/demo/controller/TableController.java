package com.example.demo.controller;


import com.example.demo.model.dto.ProductUpdateDto;
import com.example.demo.model.dto.TableAddDto;
import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.RestaurantTable;
import com.example.demo.model.view.ProductViewModel;
import com.example.demo.model.view.TableViewModel;
import com.example.demo.service.TableService;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RelationTypeSupport;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/table")
public class TableController {

    private final TableService tableService;

    @Autowired
    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @PostMapping("/save")
    public ResponseEntity<RestaurantTable> createTable(@RequestBody  TableAddDto tableAddDto) {
        RestaurantTable savedTable =  tableService.saveTable(tableAddDto);
        return new ResponseEntity<>(savedTable, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTableById(@PathVariable Long id) {
        try {
            tableService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Product with id " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<TableViewModel>> getAllTables() {
        return ResponseEntity.ok(tableService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TableViewModel> getTableWithId(@PathVariable Long id) {
        TableViewModel tableViewModel = tableService.getTableViewModelById(id);
        return ResponseEntity.ok(tableViewModel);
    }

    @PutMapping("{id}")
    public ResponseEntity<RestaurantTable > updateProduct(@PathVariable Long id, @RequestBody TableAddDto tableAddDto) {
        try {
            RestaurantTable table = tableService.update(id, tableAddDto);
            if (table != null) {
                return ResponseEntity.ok(table);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
