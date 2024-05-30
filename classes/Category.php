<?php
    
    class Category{
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'createCategoryRoute']);
        }
        function createCategoryRoute(){
            register_rest_route('v1', '/getCategoriesByBranchIDAndLanguageID/(?P<id>\d+)/(?P<languageId>\d+)', [
                'methods' => 'GET',
                'callback' => [$this, 'getCategoriesByBranchIDAndLanguageID'],
                'permission_callback' => [$this, 'getPermission'],
                'args' => [
                    'id' => [
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ],
                    'languageId' => [
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ]
                    
                ]
            ]);
            register_rest_route('v1', '/getCategories', [
                'methods' => 'GET',
                'callback' => [$this, 'getCategories'],
                'permission_callback' => [$this, 'getPermission']
            ]);
            register_rest_route('v1', '/saveCategory', [
                'methods' => 'POST',
                'callback' => [$this, 'saveCategory'],
                'permission_callback' => [$this, 'savePermission']
            ]);
            register_rest_route('v1', '/deleteCategory', [
                'methods' => 'DELETE',
                'callback' => [$this, 'deleteCategory'],
                'permission_callback' => [$this, 'deletePermission']
            ]); 
            register_rest_route('v1', '/updateCategory', [
                'methods' => 'POST',
                'callback' => [$this, 'updateCategory'],
                'permission_callback' => [$this, 'updatePermission']
            ]);
        }
        public function getCategories($req){
            global $wpdb;
            $categories = $wpdb->get_results("SELECT * FROM categories");
            $response = [
                'categories' => $categories 
            ];

            return rest_ensure_response($response);
        }
        public function getCategoriesByBranchIDAndLanguageID($req){
            $id = $req["id"];
            $language_id = $req["languageId"];
            global $wpdb;
            $categories = $wpdb->get_results("SELECT * FROM categories where BranchId=$id AND LanguageId=$language_id");
            $response = [
                'categories' => $categories 
            ];

            return rest_ensure_response($response);
        }
        public function saveCategory()
        {
            global $wpdb;
            $categoryName = $_POST["categoryName"];
            $branchId = $_POST["branchId"];
            $languageId = $_POST["languageId"];
            if (isset($_FILES['categoryImage']) && $_FILES['categoryImage']['error'] === 0) {
                $imageFile = $_FILES['categoryImage'];
               
                $filePatch = WPRK_PATH . 'uploads/';
            
                if (!is_dir($filePatch)) {
                    if (!mkdir($filePatch, 0755, true)) {
                        echo json_encode([
                            'error' => 'Klasör oluşturulamadı'
                        ]);
                      
                    } 
                } 
                $imageFileExtension = pathinfo($imageFile['name'], PATHINFO_EXTENSION);
                $newImageFileName = uniqid('image_', true) . '.' . $imageFileExtension;
                $imageFilePatch = $filePatch . $newImageFileName;

               
                if(!move_uploaded_file($imageFile['tmp_name'], $imageFilePatch)) {
                    echo json_encode([
                        'error'=> 'Resim Yüklenemedi'
                    ]);
                    exit;
                }
            
                $imageFileUrl =  '/wp-content/plugins/wp-qr-menu/uploads/' . $newImageFileName;
            
               
               
                $result = $wpdb->insert(
                    'categories',
                    array(
                        'BranchId' => $branchId,
                        'CategoryName' => $categoryName,
                        'CategoryImage' => $imageFileUrl,
                        'LanguageId'=> $languageId,
                    )
                );
            
                if($result === false) {
                    echo json_encode([
                        'error'=> 'Veritabanına kaydedilemedi'
                    ]);
                exit;
                }
                else{
                    echo json_encode([
                        'success'=> true
                        ]);
                }
            } 

            
            else{
                $result = $wpdb->insert(
                    'categories',
                    array(
                        'BranchId' => $branchId,
                        'CategoryName' => $categoryName,
                        'LanguageId'=> $languageId,
                        'CategoryImage' => ''
                    )
                );
            
                if($result === false) {
                    echo json_encode([
                        'error'=> 'Veritabanına kaydedilemedi'
                    ]);
                exit;
                }
                else{
                    echo json_encode([
                        'success'=> true
                        ]);
                }
            }

            
        }
        public function deleteCategory(){
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $data['id'];
                global $wpdb;
                 $result =  $wpdb->delete(
                   "categories",
                    array('id'=>$id)
                );
               return rest_ensure_response("deleted");
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
        }
        public function updateCategory(){
            $categoryName = $_POST["categoryName"];
            $Id = $_POST["id"];
            if (isset($_FILES['categoryImage']) && $_FILES['categoryImage']['error'] === 0) {
                $imageFile = $_FILES['categoryImage'];
            
                $filePatch = WPRK_PATH . 'uploads/';
            
                if (!is_dir($filePatch)) {
                    if (!mkdir($filePatch, 0755, true)) {
                        echo json_encode([
                            'error' => 'Klasör oluşturulamadı'
                        ]);
                      
                    } 
                } 
                $imageFileExtension = pathinfo($imageFile['name'], PATHINFO_EXTENSION);
                $newImageFileName = uniqid('image_', true) . '.' . $imageFileExtension;
                $imageFilePatch = $filePatch . $newImageFileName;

               
                if(!move_uploaded_file($imageFile['tmp_name'], $imageFilePatch)) {
                    echo json_encode([
                        'error'=> 'Resim Yüklenemedi'
                    ]);
                    exit;
                }
            
                $imageFileUrl =  '/wp-content/plugins/wp-qr-menu/uploads/' . $newImageFileName;
            
                
                global $wpdb;
                $result = $wpdb->update(
                    'categories',
                    array(
                        'CategoryName' => $categoryName,
                        'CategoryImage' => $imageFileUrl
                    ),
                    array('id' => $Id),
                );
            
                echo json_encode([
                    'success'=> true,
                    'result'=> $result
                    ]);
            }
            else{
                global $wpdb;
                $result = $wpdb->update(
                    'categories',
                    array(
                        'CategoryName' => $categoryName,
                    ),
                    array('id' => $Id),
                );
            }
        }
        
        public function getPermission()
        {
            return true;
        }
        public function savePermission()
        {
            return true;
        }
        public function deletePermission()
        {
            return true;
        }
        public function updatePermission()
        {
            return true;
        }
        

    }
new Category();
