<template>
    <div class="body">

        <div class="pl50 pt50 pr50">
            <div class="tc">
                <div class="title-large">日报统计</div>
            </div>
            <c-box type="search">
                <template slot="title">搜索条件</template>
                <template slot="append">
                    <div class="state-tag success">已关注</div>
                    <div class="state-tag success">已关注</div>
                </template>
                 <el-form :inline="true">
                    <el-form-item class="水电费">
                        <el-input/>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-select>
                            <el-option label="sd" value="1"></el-option>
                            <el-option label="sd" value="2"></el-option>
                            <el-option label="sd" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>

                        <el-button type="primary" plain>查询</el-button>
                        <el-button type="blue" plain>查询</el-button>
                    </el-form-item>
                 </el-form>
            </c-box>

            <c-box type="title">
                <template slot="title">搜索条件</template>
                <template slot="append">
                    <div class="state-tag success">已关注</div>
                    <div class="state-tag success">已关注</div>
                </template>
                 <el-form :inline="true">
                    <el-form-item class="水电费">
                        <el-input/>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-select>
                            <el-option label="sd" value="1"></el-option>
                            <el-option label="sd" value="2"></el-option>
                            <el-option label="sd" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-input/>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-select>
                            <el-option label="sd" value="1"></el-option>
                            <el-option label="sd" value="2"></el-option>
                            <el-option label="sd" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-input/>
                    </el-form-item>
                    <el-form-item class="水电费">
                        <el-select>
                            <el-option label="sd" value="1"></el-option>
                            <el-option label="sd" value="2"></el-option>
                            <el-option label="sd" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>

                        <el-button type="primary" plain>查询</el-button>
                        <el-button type="blue" plain>查询</el-button>
                    </el-form-item>
                 </el-form>
            </c-box>

             <c-box></c-box>
        </div>

        <el-form style="width:300px; padding: 50px">
            <el-form-item>
                <el-input/><br><br>
                <el-select>
                  <el-option label="sd" value="1"></el-option>
                  <el-option label="sd" value="2"></el-option>
                  <el-option label="sd" value="3"></el-option>
                </el-select><br><br>
                <el-input type="textarea"/><br><br>

                <el-button type="primary" plain>查询</el-button>
                <el-button type="blue" plain>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="禁用" disabled></el-checkbox>
                    <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <c-input/>
            </el-form-item>
            <el-form-item>
                <c-input type="textarea"/>
            </el-form-item>
            <el-form-item>
                <c-input type="textarea" :rows="5"/>
            </el-form-item>
            <el-form-item>
                <div class="pl50 pb50">
                    <div class="title-box">
                        <div class="pre"></div>
                        <div class="txt">预警概况</div>
                        <div class="after"></div>
                    </div>
                </div>
            </el-form-item>

            
            <el-form-item>
                <el-radio-group v-model="radio4" size="mini">
                    <el-radio-button label="上"></el-radio-button>
                    <el-radio-button label="北"></el-radio-button>
                    <el-radio-button label="广"></el-radio-button>
                    <el-radio-button label="深"></el-radio-button>
                    </el-radio-group>
            </el-form-item>

            <el-form-item>
                <div class="state-tag success">已关注</div>
                <div class="state-tag info">已关注</div>
                <div class="state-tag warning">已关注</div>
                <div class="state-tag danger">已关注</div>
                <div class="state-tag default">已关注</div>
            </el-form-item>
            <el-form-item>
                <div class="tag-btn act">正常</div>
                <div class="tag-btn">关注</div>
            </el-form-item>
            <el-form-item>
                <div class="tag-num">1</div>
                <div class="tag-num">2</div>
            </el-form-item>
            <el-form-item>
                <c-tag>水电费</c-tag>
            </el-form-item>
            <el-form-item>
                <div class="c-btn"><i class="iconfont icon-tianjia pr5"></i>新增</div>
            </el-form-item>
        </el-form>

        <el-dialog title="审核" :visible="false" >
            <el-form>
                <el-form-item label="客户名称">
                    <div class="state-tag success">已关注</div>
                    <div class="state-tag info">已关注</div>
                    <div class="state-tag warning">已关注</div>
                    <div class="state-tag danger">已关注</div>
                    <div class="state-tag default">已关注</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <div class="tag-btn act">正常</div>
                    <div class="tag-btn">关注</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <div class="tag-num">1</div>
                    <div class="tag-num">2</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <c-tag>水电费</c-tag>
                </el-form-item>
                <el-form-item label="客户名称">
                    <div class="tag-btn act">正常</div>
                    <div class="tag-btn">关注</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <div class="tag-num">1</div>
                    <div class="tag-num">2</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <c-tag>水电费</c-tag>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" plain>确定</el-button>
                <el-button type="blue" size="mini" plain>取消</el-button>
            </div>
        </el-dialog>

        <div class="pl50 pb50 pr50">
            <el-table :data="list">
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip ></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业名称" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" prop="id" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>


        
        
    </div>
</template>
<script>
import cInput from '../components/c-input';
import cTag from '../components/c-tag';
import cBox from '../components/c-box';
export default {
    components:{
        cInput,cTag,cBox
    },
    data(){
        return {
            checkList: [],
            radio4: '',
            list:[
                { id: '阿萨啥的发送到发送到发上的阿发啥的发送到发送到发上的' },
                { id: '水电费' },
                { id: '水电费' },
                { id: '水电费' },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.body{
    background: #03122C;
}


.title-box{
    width: 124px;
    height: 28px ;
    text-align: center;
    .txt{
        padding: 4px;
        color: #fff;
    }
    .pre,.after{
        position: relative;
        width: 100%;
        height: 1px;
        background-image: radial-gradient(#17D7EB 30%, #0E1B36 60%, rgba(0,0,0,.6));
        &::before,&::after{
            content: '';
            position: absolute;
            top: 0px;
            height: 2px;
            width: 2px;
            background: #17D7EB;
            border-radius: 50%;
        }
        &::before{
            left: 0;
        }
        &::after{
            right: 0;
        }
    }
}
</style>

 