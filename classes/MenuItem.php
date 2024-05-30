<?php
    
    class MenuItem{
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'createMenuItemRoute']);
        }
    
    function createMenuItemRoute(){
        register_rest_route('v1', '/getItemsByCategoryId/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'getItemsByCategoryId'],
            'permission_callback' => [$this, 'getPermission'],
            'args' => [
                'id' => [
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ]
            ]
        ]);
        register_rest_route('v1', '/saveMenuItem', [
            'methods' => 'POST',
            'callback' => [$this, 'saveMenuItem'],
            'permission_callback' => [$this, 'savePermission']
        ]);
        register_rest_route('v1', '/deleteMenuItem', [
            'methods' => 'DELETE',
            'callback' => [$this, 'deleteMenuItem'],
            'permission_callback' => [$this, 'deletePermission']
        ]); 
        register_rest_route('v1', '/updateMenuItem', [
            'methods' => 'POST',
            'callback' => [$this, 'updateMenuItem'],
            'permission_callback' => [$this, 'updatePermission']
        ]);
    }
    public function getItemsByCategoryId($req){
        $id = $req["id"];
        global $wpdb;
        $items = $wpdb->get_results("SELECT * FROM items where CategoryId= $id");
        $menuItemsWithTickets = [];
        foreach($items as $item){
            $itemTickets = $wpdb->get_results("SELECT * FROM itemtickets where ItemId= $item->id");
            $tickets = [];
            foreach($itemTickets as $itemTicket){
                $ticket = $wpdb->get_results("SELECT * FROM tickets where id= $itemTicket->TicketId");
                array_push($tickets, $ticket[0]);
            }
            $item->tickets = $tickets;
            array_push($menuItemsWithTickets, $item);
        }

        $response = [
            'items' => $menuItemsWithTickets 
        ];

        return rest_ensure_response($response);
    }
    public function saveMenuItem()
    {
        global $wpdb;
        $itemId = 0;
        $itemName = $_POST["itemName"];
        $itemTickets = json_decode(stripslashes($_POST["itemTicket"]), true);
        $itemPrice = $_POST["itemPrice"];
        $itemExplanation = $_POST["itemExplanation"];
        $categoryId = $_POST["categoryId"];
        if (isset($_FILES['itemImage']) && $_FILES['itemImage']['error'] === 0) {
            $imageFile = $_FILES['itemImage'];
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
                'items',
                array(
                    'CategoryId' => $categoryId,
                    'ItemName' => $itemName,
                    'ItemImage' => $imageFileUrl,
                    'ItemPrice' => $itemPrice,
                    'ItemExplanation' => $itemExplanation,
                ),
            );
            $itemId = $wpdb->insert_id;
            foreach($itemTickets as $key => $value){
                $wpdb-> insert("itemtickets",array(
                    "ItemId"=> $itemId,
                    "TicketId" => $value["id"],
                ));
            }
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
                'items',
                array(
                    'CategoryId' => $_POST["categoryId"],
                    'ItemName' => $_POST["itemName"],
                    'ItemImage' => "",
                    'ItemPrice' => $_POST["itemPrice"],
                    'ItemExplanation' => $_POST["itemExplanation"],
                ), 
            );
            $itemId = $wpdb->insert_id;
            foreach($itemTickets as $key => $value){
                $wpdb-> insert("itemtickets",array(
                    "ItemId"=>  $itemId,
                    "TicketId" => $value["id"],
                ));
            }
        }
    
    }
    public function deleteMenuItem(){
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'];
            global $wpdb;
             $result =  $wpdb->delete(
               "items",
                array('id'=>$id)
            );
           return rest_ensure_response("deleted");
        } catch (\Throwable $th) {
            return rest_ensure_response(array("error" => $th->getMessage()), 500);
        }
    }
    public function updateMenuItem(){
        global $wpdb;
        $itemName = $_POST["itemName"];
        $itemTickets = json_decode(stripslashes($_POST["itemTicket"]), true);
        $itemPrice = $_POST["itemPrice"];
        $itemExplanation = $_POST["itemExplanation"];
        $Id = $_POST["id"];

        $getItemTickets = $wpdb->get_results("SELECT * FROM itemtickets where ItemId= $Id");
        foreach($getItemTickets as $itemTicket){
            $wpdb->delete("itemtickets", array('ItemId' => $Id));
        }
        if (isset($_FILES['itemImage']) && $_FILES['itemImage']['error'] === 0) {
            $imageFile = $_FILES['itemImage'];
        
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
        
            
           
            $result = $wpdb->update(
                'items',
                array(
                    'ItemImage' => $imageFileUrl,
                    'ItemName' => $itemName,
                    'ItemExplanation' => $itemExplanation,
                    'ItemPrice' => $itemPrice,
                ),
                array('id' => $Id),
            );
            foreach($itemTickets as $key => $value){
                $wpdb-> insert("itemtickets",array(
                    "ItemId"=>  $Id,
                    "TicketId" => $value["id"],
                ));
            }
            echo json_encode([
                'success'=> true,
                'result'=> $result
                ]);
        }
        else{
            $result = $wpdb->update(
                'items',
                array(
                    'ItemName' => $itemName,
                    'ItemExplanation' => $itemExplanation,
                    'ItemPrice' => $itemPrice,
                ),
                array('id' => $Id),
            );
            foreach($itemTickets as $key => $value){
                $wpdb-> insert("itemtickets",array(
                    "ItemId"=>  $Id,
                    "TicketId" => $value["id"],
                ));
            }
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
new MenuItem();