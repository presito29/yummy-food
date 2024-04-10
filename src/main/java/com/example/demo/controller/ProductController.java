package com.example.demo.controller;

import com.example.demo.model.dto.ProductAddDto;
import com.example.demo.model.dto.ProductUpdateDto;
import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.User;
import com.example.demo.model.view.ProductViewModel;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.example.demo.constant.Constant.PHOTO_DIR;


@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    private final UserService userService;

    @Autowired
    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;

        this.userService = userService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts( @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(productService.findAll());
    }


    @GetMapping("/allByCategory")
    public ResponseEntity<List<ProductViewModel>> getAllProductsByCategory(@RequestParam(required = false) String category, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(productService.findAllByCategory(category.toUpperCase()));
    }




    @GetMapping("{id}")
    public ResponseEntity<ProductViewModel> getProduct(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(productService.getProductWithId(id));
    }


    @GetMapping(path = "/image/{filename}", produces = {"image/png", "image/jpeg"})
    public byte[] getPhoto (@PathVariable(value = "filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIR + filename));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchFood(@RequestParam String name, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Product> products = productService.searchFood(name);

        return new ResponseEntity<>(products, HttpStatus.CREATED); }
}
