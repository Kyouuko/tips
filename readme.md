# Tips and Tricks with Angular
## GC Marino

1. Input debounce
this.form.controls['yourControl'].valueChanges.pipe(<span style="color: red">debounceTime(</span><span style="color: blue">1000</span><span style="color: red">)</span>).subscribe()