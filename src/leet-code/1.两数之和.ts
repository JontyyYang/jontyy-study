/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    const temp = target - nums[i];
    const index = nums.lastIndexOf(temp);

    if (index > i) return [i, index];
  }
}

// @lc code=end
