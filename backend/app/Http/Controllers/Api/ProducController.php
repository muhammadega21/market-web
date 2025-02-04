<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProducController extends Controller
{
    public function index()
    {
        $products = Product::latest();
        if (Auth::user()->role === 'admin') {
            $products = Product::latest()->get();
        } else {
            $products = Product::where('user_id', Auth::user()->id)->get()->sortByDesc('created_at');
        }
        if (!$products) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Post Empty'
            ], Response::HTTP_OK);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'List Products',
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'amount' => $product->amount,
                    'publish_date' => $product->created_at->format('Y-m-d H:i:s'),
                    'user' => [
                        'name' => $product->user->name
                    ]
                ];
            })
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'amount' => 'required|numeric'
        ], [
            'name.required' => 'Nama produk tidak boleh kosong!',
            'name.max' => 'Nama produk maksimal 50 karakter!',

            'amount.required' => 'Jumlah produk tidak boleh kosong!',
            'amount.numeric' => 'Jumlah produk harus berupa angka!'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            Product::create([
                'name' => $request->input('name'),
                'amount' => $request->input('amount'),
                'user_id' => Auth::user()->id
            ]);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => "Berhasil menambah produk",
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("error stored data : " . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed stored data to db'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'amount' => 'required|numeric'
        ], [
            'name.required' => 'Nama produk tidak boleh kosong!',
            'name.max' => 'Nama produk maksimal 50 karakter!',

            'amount.required' => 'Jumlah produk tidak boleh kosong!',
            'amount.numeric' => 'Jumlah produk harus berupa angka!'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            Product::where('id', $id)->update([
                'name' => $request->input('name'),
                'amount' => $request->input('amount'),
            ]);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => "Berhasil update produk",
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("error update data : " . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed update data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        $data = Product::find($id);
        try {
            $data->delete();

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => "Berhasil menghapus produk",
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("error delete data : " . $e->getMessage());

            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'failed delete data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
