interface User { 
    id : number,
    name : string,
    image: string | null
    image_path : string | null
    mobile : number | null
    email : string
    email_verified_at : null
}

// 'id' => $this->id,
// 'name' => $this->name,
// 'image' => $this->image,
// 'image_path' => $this->imagePath,
// 'mobile' => $this->mobile,
// 'email' => $this->email,
// 'email_verified_at' => $this->email_verified_at,
// 'companies' => CompanyResource::collection($this->whenLoaded('companies')),