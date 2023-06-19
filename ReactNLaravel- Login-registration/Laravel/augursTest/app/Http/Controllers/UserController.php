<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class UserController extends Controller
{
    public function userRegistration(Request $request) {
        $validator = Validator::make($request->all(),[
            "firstname"=>"required",
            "lastname"=>"required",
            "email"=>"required|email",
            "password"=>"required|confirmed",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status"=>"failed",
                "message"=>"Error_In_Validation",
                "error"=>$validator->errors()
            ]);
        }
        $userRegisterationData = array("firstname"=>$request->fname,
        "lastname"=>$request->lname,
        "email"=>$request->email,
        "passsword"=>md5($request->fname));
        
        $isUserExist = User::where("email", $request->email)->first();

        if (!is_null($isUserExist)) {
            return response()->json([
                "status"=>"failed",
                "message"=>"Email already existed!",
                "error"=>$validator->errors()
            ]);
        }
        $userCreate = User::create($userRegisterationData);

        if (!is_null($userCreate)) {
            return response()->json([
                "status"=>200,
                "message"=>"User registered successfully!",
                "data"=>$userRegisterationData
            ]);
        } else {
            return response()->json([
                "status"=>"failed",
                "message"=>"User registration failed!",
            ]);
        }
    }
    //Login
    public function userLogin(Request $request) {
        $validator = Validator::make($request->all(),[
            "email"=>"required|email",
            "password"=>"required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status"=>"failed",
                "message"=>"Error_In_Validation",
                "error"=>$validator->errors()
            ]);
        }
        $userRegisterationData = array("firstname"=>$request->firstname,
        "lastname"=>$request->lname,
        "email"=>$request->email,
        "passsword"=>md5($request->fname));
        
        $isEmailExist = User::where("email", $request->email)->first();
        
        if (!is_null($isEmailExist)) {
            $isPasswordMatch = User::where("email", $request->email)
            ->where("password", md5($request->password))
            ->first();

            if (!is_null($isPasswordMatch)) {
                return response()->json([
                    "status"=>200,
                    "message"=>"User login successfully!",
                    "data"=>$userRegisterationData
                ]);
            } else {
                return response()->json([
                    "status"=>"failed",
                    "message"=>$isPasswordMatch,
                ]);
            }
        }
    }
    //user details
    public function userDetails($email){
        $user=array();
        if ($email!==""){
            return User::where("email", $email)->first();
        } else {
            return $user;
        }
    }

}
