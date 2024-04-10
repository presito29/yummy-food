package com.example.demo.service;


import com.example.demo.model.dto.ProductAddDto;
import com.example.demo.model.dto.TableAddDto;
import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.RestaurantTable;
import com.example.demo.model.view.ProductViewModel;
import com.example.demo.model.view.TableViewModel;
import com.example.demo.repository.TableRepository;
import jakarta.transaction.Transactional;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    private final TableRepository tableRepository;

    @Autowired
    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public RestaurantTable saveTable(TableAddDto tableAddDto) {


        RestaurantTable table = new RestaurantTable();
        table.setCapacity(tableAddDto.getCapacity());
        table.setSmokerOrNo(smokerOrNo(tableAddDto.getSmokerOrNo().toLowerCase()));
        table.setInside_outside(tableAddDto.getInside_outside());


        return tableRepository.save(table);
    }

    private boolean smokerOrNo(String smokerOrNo) {
        return smokerOrNo.equals("smoker");
    }

    public RestaurantTable update(Long id, TableAddDto tableAddDto){
        try {
            RestaurantTable restaurantTable = tableRepository.findById(id).orElseThrow();
            if (tableAddDto.getCapacity() == 0){
                restaurantTable.setCapacity(restaurantTable.getCapacity());
            }else{
                restaurantTable.setCapacity(tableAddDto.getCapacity());
            }if (tableAddDto.getSmokerOrNo() == null){
                restaurantTable.setSmokerOrNo(restaurantTable.isSmokerOrNo());
            }else {
                restaurantTable.setSmokerOrNo(smokerOrNo(tableAddDto.getSmokerOrNo().toLowerCase()));
            }if (tableAddDto.getInside_outside() == null){
                restaurantTable.setInside_outside(restaurantTable.getInside_outside());
            }else {
                restaurantTable.setInside_outside(tableAddDto.getInside_outside());
            }

            return tableRepository.save(restaurantTable);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    @Transactional
    public void  deleteById(Long id) {
        RestaurantTable restaurantTable = this.tableRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, "product"));

        this.tableRepository.delete(restaurantTable);
    }

    public List<TableViewModel> findAll() {
        List<RestaurantTable> tables = tableRepository.findAll();
        List<TableViewModel> tableViewModelList = new ArrayList<>();


        for (RestaurantTable restaurantTable : tables) {

            TableViewModel tableViewModel = new TableViewModel();
            tableViewModel.setId(restaurantTable.getId());
            tableViewModel.setCapacity(restaurantTable.getCapacity());
            tableViewModel.setSmokerOrNo(smokerOrNo(restaurantTable.isSmokerOrNo()));
            tableViewModel.setInside_outside(restaurantTable.getInside_outside());

            tableViewModelList.add(tableViewModel);
        }
        return tableViewModelList;
    }



    public TableViewModel getTableViewModelById(Long id) {
        RestaurantTable restaurantTable = tableRepository.findById(id)
                .orElseThrow();
        return convertToTableViewModel(restaurantTable);
    }
    private TableViewModel convertToTableViewModel(RestaurantTable restaurantTable) {
        return TableViewModel.builder()
                .id(restaurantTable.getId())
                .capacity(restaurantTable.getCapacity())
                .smokerOrNo(smokerOrNo(restaurantTable.isSmokerOrNo()))
                .inside_outside(restaurantTable.getInside_outside())
                .build();
    }
    public String smokerOrNo (boolean smoker){
        return smoker ? "smoker" : "non-smoker";
    }

}
