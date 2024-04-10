package com.example.demo.service;


import com.example.demo.model.dto.ProductAddDto;
import com.example.demo.model.dto.ProductUpdateDto;
import com.example.demo.model.entity.Product;
import com.example.demo.model.view.ProductViewModel;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.example.demo.constant.Constant.PHOTO_DIR;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Transactional
@Service
public class ProductService {

 private final ProductRepository productRepository;
 private final CategoryRepository categoryRepository;
 private final CategoryService categoryService;


    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }




    public List<ProductViewModel> findAllByCategory(String foodCategory) {
        List<ProductViewModel> productViewModelList = new ArrayList<>();
        List<Product> products = productRepository.findProductsByCategoryName(foodCategory);

        for (Product product : products) {
            ProductViewModel productViewModel = new ProductViewModel();
            productViewModel.setId(product.getId());
            productViewModel.setName(product.getName());
            productViewModel.setDescription(product.getDescription());
            productViewModel.setCapacity(product.getCapacity());
            productViewModel.setPrice(product.getPrice());
            productViewModel.setCategory(product.getCategory().getName());
            productViewModel.setImagePath(product.getImagePath());

            productViewModelList.add(productViewModel);
        }
        return productViewModelList;
    }

    public List<Product> findAll(){
        List<ProductViewModel> productViewModelList = new ArrayList<>();
        List<Product> products = productRepository.findAll();


        for (Product product:products) {
            ProductViewModel productViewModel = new ProductViewModel();
            productViewModel.setId(product.getId());
            productViewModel.setName(product.getName());
            productViewModel.setDescription(product.getDescription());
            productViewModel.setCapacity(product.getCapacity());
            productViewModel.setPrice(product.getPrice());
            productViewModel.setCategory(product.getCategory().getName());
            productViewModel.setImagePath(product.getImagePath());

            productViewModelList.add(productViewModel);
        }
        return products;
    }



    public Product update(ProductUpdateDto productUpdateDto, Long id){
        try {
            Product product = productRepository.getById(id);
            if (productUpdateDto.getName() == null){
                product.setName(product.getName());
            }else{
                product.setName(productUpdateDto.getName());
            }if (productUpdateDto.getPrice() == null){
                product.setPrice(product.getPrice());
            }else {
                product.setPrice(productUpdateDto.getPrice());
            }if (productUpdateDto.getCapacity() == 0){
                product.setCapacity(product.getCapacity());
            }else {
                product.setCapacity(productUpdateDto.getCapacity());
            }if (productUpdateDto.getCategory() == null){
                product.setCategory(product.getCategory());
            }else {
                if (categoryRepository.findCategoryByName(productUpdateDto.getCategory()) == null){
                    categoryService.create(productUpdateDto.getCategory());
                }
                else {
                    product.setCategory(categoryRepository.findCategoryByName(productUpdateDto.getCategory()));
                }
            }if (productUpdateDto.getDescription() == null){
                product.setDescription(product.getDescription());
            }else {
                product.setDescription(productUpdateDto.getDescription());
            }

            return productRepository.save(product);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
        }




    public void  deleteById(Long id) {
        Product product = this.productRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, "product"));

        this.productRepository.delete(product);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product createPro(ProductAddDto productAddDto){
        System.out.println();
        if (categoryRepository.findCategoryByName(productAddDto.getCategory()) == null){
            categoryService.create(productAddDto.getCategory());
        }
        Product product = Product.builder()
                .name(productAddDto.getName())
                .price(productAddDto.getPrice())
                .category(categoryRepository.findCategoryByName(productAddDto.getCategory()))
                .capacity(productAddDto.getCapacity())
                .description(productAddDto.getDescription())
                .build();
        return productRepository.save(product);
    }

    public String uploadPhoto(Long id, MultipartFile multipartFile){
        Product product = getProduct(id);
        String url = photoFunction.apply(id, multipartFile);
        product.setImagePath(url);
        productRepository.save(product);

        return url;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<Long, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIR).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)){
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/product/image/" + filename)
                    .toUriString();
        }catch (Exception e) {
            throw new RuntimeException("Unable to save image");
        }
    };

    public ProductViewModel getProductWithId(Long id){

        Product product = productRepository.getById(id);

        ProductViewModel productViewModel =  new ProductViewModel();

        productViewModel.setId(product.getId());
        productViewModel.setName(product.getName());
        productViewModel.setDescription(product.getDescription());
        productViewModel.setCapacity(product.getCapacity());
        productViewModel.setPrice(product.getPrice());
        productViewModel.setCategory(product.getCategory().getName());
        productViewModel.setImagePath(product.getImagePath());

        return productViewModel;
    }
    private List<Product> filterByCategory(List<Product> products, String foodCategory){
        return products.stream().filter(product -> {
            if (product.getCategory()!=null){
                return product.getCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    };
    public List<Product> searchFood (String keyword){
        return productRepository.searchProduct(keyword);
    }


}
