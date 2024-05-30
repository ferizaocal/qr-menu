<?php
    class Ticket{
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'createTicketRoute']);
        }
        function createTicketRoute(){
            register_rest_route('v1', '/getTicketsByBranchID/(?P<id>\d+)', [
                'methods' => 'GET',
                'callback' => [$this, 'getTicketsByBranchID'],
                'permission_callback' => [$this, 'getPermission'],
                'args' => [
                    'id' => [
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ]
                ]
            ]);
            register_rest_route('v1', '/saveTicket', [
                'methods' => 'POST',
                'callback' => [$this, 'saveTicket'],
                'permission_callback' => [$this, 'savePermission']
            ]);
            register_rest_route('v1', '/deleteTicket', [
                'methods' => 'DELETE',
                'callback' => [$this, 'deleteTicket'],
                'permission_callback' => [$this, 'deletePermission']
            ]); 
            register_rest_route('v1', '/updateTicket', [
                'methods' => 'POST',
                'callback' => [$this, 'updateTicket'],
                'permission_callback' => [$this, 'updatePermission']
            ]);
         
        }
        public function getTicketsByBranchID($req){
            $id = $req["id"];
            global $wpdb;
            $tickets = $wpdb->get_results("SELECT * FROM tickets Where BranchId=$id ");
            $response = [
                'tickets' => $tickets
            ];

            return rest_ensure_response($response);
        }
        public function saveTicket()
        {
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $ticketName = $data["ticketName"];
                $ticketValue = $data["ticketValue"];
                $branchId = $data["branchId"];
               
           
                global $wpdb;
                $result = $wpdb->insert(
                    'tickets',
                    array(

                        'TicketValue'=> $ticketValue,
                        'TicketName' => $ticketName,
                        'BranchId'=> $branchId
                       
                    )
                );
              
                return rest_ensure_response($result);
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
        }
        public function deleteTicket(){
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $data['id'];
                global $wpdb;
                 $result =  $wpdb->delete(
                   "tickets",
                    array('id'=>$id)
                );
               return rest_ensure_response("deleted");
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
            
        }
        public function updateTicket(){
            try{
            $data = json_decode(file_get_contents("php://input"), true);
            $ticketValue = $data["ticketValue"];
            $ticketName = $data["ticketName"];
            $branchId = $data["branchId"];
            $Id = $data["id"];

            global $wpdb;
            $result = $wpdb->update(
                'tickets',
                array(
                    'TicketValue'=> $ticketValue,
                    'TicketName' => $ticketName,
                    'BranchId'=> $branchId
                ),
                array('id' => $Id),
               
            ); return rest_ensure_response("updated");
        } catch (\Throwable $th) {
            return rest_ensure_response(array("error" => $th->getMessage()), 500);
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
new Ticket();