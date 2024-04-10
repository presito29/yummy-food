package com.example.demo.controller.admin;

import com.example.demo.model.dto.ProductAddDto;
import com.example.demo.model.dto.ProductUpdateDto;
import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.User;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequestMapping("/api/admin")
public class AdminProductController {
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public AdminProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Long id, @RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwtToken(jwt);

            productService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Product with id " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Product> create (@RequestBody ProductAddDto product, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.created(URI.create("/products/productId")).body(productService.createPro(product));
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto (@RequestParam("id") Long id, @RequestParam("file") MultipartFile file,@RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(productService.uploadPhoto(id, file));
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductUpdateDto productUpdateDto) {
        try {
            Product updatedProduct = productService.update(productUpdateDto, id);
            if (updatedProduct != null) {
                return ResponseEntity.ok(updatedProduct);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
