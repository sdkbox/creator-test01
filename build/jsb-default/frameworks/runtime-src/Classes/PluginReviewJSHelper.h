
#pragma once

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "scripting/js-bindings/manual/jsb_conversions.hpp"

namespace se {
    class Object;
}

bool register_all_PluginReviewJS_helper(se::Object* obj);
