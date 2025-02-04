<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:4|max:50',
            'password' => 'required|min:4',
            'email' => 'required|email:rfc,dns'
        ], [
            'name.required' => 'Nama tidak boleh kosong!',
            'name.min' => 'Nama tidak kurang dari 4 karakter!',
            'name.max' => 'Nama tidak lebih dari 50 karakter!',

            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password tidak kurang dari 4 karakter',

            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email yang anda masukkan salah!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'role' => 'user'
            ]);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Berhasil daftar! silahkan login',
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->email)->first();

        $validator = Validator::make($request->all(), [
            'email' => 'required|email:rfc,dns',
            'password' => 'required|min:4',
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email yang anda masukkan salah!',

            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password tidak kurang dari 4 karakter',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!Auth::attempt($credentials)) {
            if (!$user || !Hash::check($request['password'], $user->password)) {
                return response()->json([
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'Email atau password salah!'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        $token = $user->createToken('login_token')->plainTextToken;
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Berhasil Login',
            'access_token' => $token,
        ], Response::HTTP_OK);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Berhasil Logout'
        ], Response::HTTP_OK);
    }
}
