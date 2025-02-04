<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => 'Unauthorized'
            ], Response::HTTP_FORBIDDEN);
        }
        try {
            $users = User::latest()->get();

            if (!$users) {
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Post Empty',

                ], Response::HTTP_OK);
            }

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => "List Users",
                'data' => $users->map(function ($user) {
                    return [
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'image' => $user->user_profile
                    ];
                })
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("error get data : " . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed get data from db'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:4|max:50',
            'user_profile' => 'mimes:png,jpg,jpeg|max:2048'
        ], [
            'name.required' => 'Nama Tidak Boleh Kosong!',
            'name.min' => 'Nama Tidak Kurang Dari 4 Karakter!',
            'name.max' => 'Nama Tidak Lebih Dari 50 Karakter!',

            'user_profile.mines' => 'Gambar Harus Berformat jpg, jpeg, dan png!',
            'user_profile.max' => 'Gambar Tidak Lebih dari 2mb!'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $token = $request->bearerToken();
        $currentUser = PersonalAccessToken::findToken($token)->tokenable->id;

        if ($user->id !== $currentUser) {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => 'You are not authorized to update this post'
            ], Response::HTTP_FORBIDDEN);
        }

        $image = $user->user_profile;
        if ($request->file('image')) {
            if ($request->oldImage) {
                Storage::delete($request->oldImage);
            }
            $image = $request->file('image')->store('userImages');
        }

        try {
            $user->update([
                'name' => $request->input('name'),
                'user_profile' => $image,
            ]);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => "Berhasil update profile",
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("error update profile : " . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed update profile'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => 'Unauthorized'
            ], Response::HTTP_FORBIDDEN);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            Product::where('user_id', $id)->delete();
            $user->delete();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Berhasil menghapus user'
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error('Error deleted data :' . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed deleted data to db'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function profile()
    {
        $user = User::findOrFail(Auth()->user()->id);
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => "User Profile",
            'data' =>  [
                'name' => $user->name,
                'email' => $user->email,
                'user_role' => $user->role,
                'user_profile' => $user->user_profile
            ]

        ]);
    }
}
