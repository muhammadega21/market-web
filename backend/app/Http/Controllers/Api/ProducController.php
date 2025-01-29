<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProducController extends Controller
{
    public function index()
    {
        $products = Product::latest();
        if (Auth::user()->role == 'admin') {
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
}
