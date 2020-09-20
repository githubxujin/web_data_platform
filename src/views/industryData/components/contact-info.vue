<template>
    <div>
        <el-table :data="contactList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="gender" label="性别" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="phone" label="手机号" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="position" label="职位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="officePhone" label="办公电话" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="visitingAddress" label="拜访地址" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="source" label="来源" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ scope.row.source===1? '云筑网' : '盛易通'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        contactList: Array
    },

};
</script>