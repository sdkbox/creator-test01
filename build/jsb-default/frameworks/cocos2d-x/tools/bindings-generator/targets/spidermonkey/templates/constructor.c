## ===== constructor function implementation template

SE_DECLARE_FINALIZE_FUNC(js_${underlined_class_name}_finalize)

static bool ${signature_name}(se::State& s)
{
#if len($arguments) >= $min_args
    #set arg_count = len($arguments)
    #set arg_idx = $min_args
    #set $count = 0
    #if $arg_idx > 0
    CC_UNUSED bool ok = true;
    const auto& args = s.args();
    #end if
    #while $count < $arg_idx
        #set $arg = $arguments[$count]
        #if $arg.is_numeric
    ${arg.to_string($generator)} arg${count} = 0;
        #elif $arg.is_pointer
    ${arg.to_string($generator)} arg${count} = nullptr;
        #else
    ${arg.to_string($generator)} arg${count};
        #end if
        #set $count = $count + 1
    #end while
    #set $count = 0
    #set arg_list = ""
    #set arg_array = []
    #while $count < $arg_idx
        #set $arg = $arguments[$count]
    ${arg.to_native({"generator": $generator,
                         "in_value": "args[" + str(count) + "]",
                         "out_value": "arg" + str(count),
                         "class_name": $class_name,
                         "level": 2,
                         "is_static": False,
                         "ntype": str($arg)})};
        #set $arg_array += ["arg"+str(count)]
        #set $count = $count + 1
    #end while
    #if $arg_idx > 0
    SE_PRECONDITION2(ok, false, "${signature_name} : Error processing arguments");
    #end if
    #set $arg_list = ", ".join($arg_array)
    ${namespaced_class_name}* cobj = new (std::nothrow) ${namespaced_class_name}($arg_list);
    s.thisObject()->setPrivateData(cobj);
    #if not $is_ref_class
    se::NonRefNativePtrCreatedByCtorMap::emplace(cobj);
    #end if
#end if
    return true;
}
SE_BIND_CTOR(${signature_name}, __jsb_${underlined_class_name}_class, js_${underlined_class_name}_finalize)
