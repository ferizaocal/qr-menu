<?php
    class Language{
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'createLanguageRoute']);
        }
        function createLanguageRoute(){
            register_rest_route('v1', '/getLanguages', [
                'methods' => 'GET',
                'callback' => [$this, 'getLanguage'],
                'permission_callback' => [$this, 'getPermission']
            ]);
            register_rest_route('v1', '/saveLanguage', [
                'methods' => 'POST',
                'callback' => [$this, 'saveLanguage'],
                'permission_callback' => [$this, 'savePermission']
            ]);
            register_rest_route('v1', '/deleteLanguage', [
                'methods' => 'DELETE',
                'callback' => [$this, 'deleteLanguage'],
                'permission_callback' => [$this, 'deletePermission']
            ]); 
         
        }
        public function getLanguage(){
            global $wpdb;
            $languages = $wpdb->get_results("SELECT * FROM languages");
            $response = [
                'languages' => $languages
            ];

            return rest_ensure_response($response);
        }
        public function saveLanguage()
        {
            try {
                global $wpdb;
                $data = json_decode(file_get_contents("php://input"), true);
                $languageName = $data["languageName"];
                $exitsLanguageName = $wpdb->get_results("SELECT * FROM languages WHERE LanguageName = '$languageName'");
            
                if(count($exitsLanguageName) > 0){
                    return rest_ensure_response(array("error" => "Language already exists"), 500);
                }
           
                
                $result = $wpdb->insert(
                    'languages',
                    array(
                        'LanguageName' => $languageName,
                      
                    )
                );
              
                return rest_ensure_response($result);
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
        }
        public function deleteLanguage(){
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $data['id'];
                global $wpdb;
                 $result =  $wpdb->delete(
                   "languages",
                    array('id'=>$id)
                );
               return rest_ensure_response("deleted");
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

    }
new Language();